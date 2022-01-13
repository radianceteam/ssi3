import {signerNone, TonClient} from '@tonclient/core';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {libNode} from '@tonclient/lib-node';
import {DIDStorageABI} from '../tools/DIDStorageABI';
import {DIDDocABI} from '../tools/DIDDocABI';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifyDBEntity } from './verifyDB.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import {nanoid} from 'nanoid';
import {sign, verify} from 'jsonwebtoken';
import {JWT_SECRET, NET_EVER} from '@app/config'
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login.dto';
import { UsersEntity } from './users.entity';
let crypto = require('crypto');
import * as ed from 'noble-ed25519';
import { Account } from '@tonclient/appkit';



@Injectable()
export class AuthService {

    
    constructor(
        @InjectRepository(VerifyDBEntity)
        private readonly verifyDBRepository: Repository<VerifyDBEntity>,
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
    ){}

    async createVerify(createUserDto: CreateUserDto) {
        const newVerify = new VerifyDBEntity();
        Object.assign(newVerify, createUserDto)

        const UserDID = await this.verifyDBRepository.findOne({
            did: createUserDto.did
        })


        if(UserDID){
            Object.assign(newVerify, UserDID)
        }

        newVerify.value = this.generateToken();
        console.log(newVerify);


        return await this.verifyDBRepository.save(newVerify);
    }

    async login(loginUserDto: LoginUserDto): Promise<any>{

        const UserDID = await this.verifyDBRepository.findOne({
            did: loginUserDto.did
                })
        //loginUserDto.message == UserDID.value
        
        loginUserDto.message = UserDID.value
        console.log(loginUserDto)

        const verify = await this.verifyMessage(loginUserDto)
        console.log(verify)
        if(!verify){
            throw new HttpException(
            'Credentials are not valid',
            HttpStatus.UNPROCESSABLE_ENTITY
            )
        }

        const pubDocDid = this.getDidDocPubKey(loginUserDto.did)
        if(!pubDocDid){
            throw new HttpException(
                'Not valid did Document',
                HttpStatus.UNPROCESSABLE_ENTITY
                )
        }

        const newUser = new UsersEntity();
        Object.assign(newUser, loginUserDto)

        const user = await this.userRepository.findOne({
            did: loginUserDto.did
        })

        if(user){
            Object.assign(newUser, user)
        }
        newUser.status = 'ACTIVE'
        return await this.userRepository.save(newUser);


    }

    async getDidContract(did): Promise<string>{
        TonClient.useBinaryLibrary(libNode);
        const tonClient = new TonClient({network: {endpoints: [NET_EVER]}});
        const DIDStorageContractAddress = '0:ee63d43c1f5ea924d3d47c5a264ad2661b5a4193963915d89f3116315350d7d3';
        const acc = new Account({abi: DIDStorageABI}, {
            address: DIDStorageContractAddress, 
            client: tonClient,
            signer: signerNone()
        });
        const strDid =  did.did || did

        try {
            const response = await acc.runLocal('resolveDidDocument', {id: `0x${strDid}`});
            console.log('LOADED DID ADDRESS', response.decoded.out_messages[0].value.addrDidDocument);
            return response.decoded.out_messages[0].value.addrDidDocument;
        } catch (err) {
            console.log('DID Address load failed', err);
            return null;
        }

    }

    async getDidDoc(address): Promise<any>{
        TonClient.useBinaryLibrary(libNode);
        const tonClient = new TonClient({network: {endpoints: [NET_EVER]}});
        const strAddress =  address.addr || address

        const DIDStorageContractAddress = strAddress;
        const acc = new Account({abi: DIDDocABI}, {
            address: DIDStorageContractAddress,
            client: tonClient,
            signer: signerNone()
        });
        try {
        const response = await acc.runLocal('getDid', {});
        console.log(JSON.parse(response.decoded.out_messages[0].value.value0.didDocument));
        return JSON.parse(response.decoded.out_messages[0].value.value0.didDocument)
    } catch (err) {
        console.log('DID Document load failed', err);
        return null;
    }
    }

    async getDidDocPubKey (DidDoc): Promise<any>{

       const adrr = await this.getDidContract(DidDoc)
      
       let pubDoc

       pubDoc = await this.getDidDoc(adrr)

       return pubDoc.publicKey

    }


    generateToken(): string {
        const TOKEN_SIZE = 32;
        return nanoid(TOKEN_SIZE);
    }

    generateJwt(user: UsersEntity): string {
        return sign({
            id: user.id,
            did: user.did
        }, JWT_SECRET);
    }

    buildUserResponse(user: UsersEntity): UserResponseInterface {
        return{
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }
    async findById(id: number): Promise<UsersEntity> {
        return this.userRepository.findOne(id);
      }

    async signMessage(input): Promise<any> {

        const msg = input.message
        const msgHash = crypto.createHash('sha256').update(msg).digest('hex');
        console.log(msgHash)

        return await ed.sign(msgHash, input.privateKey);
    }

    async verifyMessage(input): Promise<boolean> {
        // return true;//todo delete me

        const hash = crypto.createHash('sha256').update(input.message).digest('hex');
        return await ed.verify(input.signatureHex, hash, input.did);
    }

    async jwtRead(input): Promise<string> {
        // return true;//todo delete me
        const verifyJWT = verify(input.jwt, JWT_SECRET)
        if(!verifyJWT){
            throw new HttpException(
            'Credentials are not valid',
            HttpStatus.UNPROCESSABLE_ENTITY
            )
        }
        return verifyJWT

    }

}
function UserEntity(UserEntity: any) {
    throw new Error('Function not implemented.');
}

