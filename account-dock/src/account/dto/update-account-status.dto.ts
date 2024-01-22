import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountStatusDto {
  @ApiProperty()
  blocked: boolean;
  @ApiProperty()
  cpf: string;
}
