import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "src/dtos/loginUser.dto";
import { CreateUserDto } from "src/dtos/createUser.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController{
    constructor(private readonly authService : AuthService) {}

    @Get()
    getAuth(){
        return this.authService.getAuth();
    }

    //Posts
    @Post('signup')
    signUp(@Body() user : CreateUserDto){
        return this.authService.signUp(user)
    }

    @Post('signin')
    signIn(@Body() credentials : LoginUserDto) {

        const {email, password} = credentials;

        return this.authService.signIn(email, password);
    }


}