import { Controller, Post,Body,Get,Param,Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
     constructor(
    @Inject('USERS_SERVICE') private client: ClientProxy,
  ) {}

  @Post()
  createUser(@Body() body: any) {
    return this.client.send({ cmd: 'create_user' }, body);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.client.send({ cmd: 'get_user' }, id);
}}

