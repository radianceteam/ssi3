import {signerNone, TonClient} from '@tonclient/core';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {libNode} from '@tonclient/lib-node';
import {DIDStorageABI} from '../tools/DIDStorageABI';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifyDBEntity } from './verifyDB.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import {nanoid} from 'nanoid';
import {sign} from 'jsonwebtoken';
import {JWT_SECRET} from '@app/config'
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login.dto';
import { UsersEntity } from './users.entity';
let crypto = require('crypto');
import * as ed from 'noble-ed25519';



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
        const verify = await this.verifyMessage(loginUserDto)
        console.log(verify)
        if(!verify){
            throw new HttpException(
            'Credentials are not valid',
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
        return await ed.verify(input.signatureHex, hash, input.publicKey);
    }

}
function UserEntity(UserEntity: any) {
    throw new Error('Function not implemented.');
}

