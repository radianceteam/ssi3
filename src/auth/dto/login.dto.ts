import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    readonly did: string;
    @IsNotEmpty()
    readonly signatureHex: boolean;
    @IsNotEmpty()
    readonly message: boolean;
    @IsNotEmpty()
    readonly publicKey: boolean;
}