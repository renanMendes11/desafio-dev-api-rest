import { ApiProperty } from '@nestjs/swagger';

export class RemoveAccountHolderDto {
  @ApiProperty()
  cpf: string;
}
