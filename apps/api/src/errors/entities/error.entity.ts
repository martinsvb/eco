import { ApiProperty } from "@nestjs/swagger";
import { Error, Prisma } from "@prisma/client";
import { ContentUserEntity } from "../../users/entities/user.entity";
import { CompanyContentEntity } from "../../companies/entities/company.entity";

export class ErrorEntity implements Error {
  @ApiProperty({ description: 'Id' })
  readonly id: string;

  @ApiProperty({ description: 'Error date time' })
  dateTime: string;

  @ApiProperty({ description: 'Error name' })
  name: string;

  @ApiProperty({ description: 'Error code', required: false })
  code: string | null;

  @ApiProperty({ description: 'Error meta data', required: false })
  meta: Prisma.JsonValue;

  @ApiProperty({ description: 'Error type', required: false })
  type: string | null;

  @ApiProperty({ description: 'User id', required: false })
  userId: string | null;

  @ApiProperty({ description: 'User name', required: false })
  userName: string | null;

  @ApiProperty({ description: 'User e-mail', required: false })
  email: string | null;

  @ApiProperty({ description: 'User e-mail confirmed', required: false })
  isEmailConfirmed: boolean | null;

  @ApiProperty({ description: 'User role', required: false })
  role: string | null;

  @ApiProperty({ description: 'Company id', required: false })
  companyId: string | null;

  @ApiProperty({ description: 'Request method and url', required: false })
  request: string | null;

  @ApiProperty({ description: 'Request params', required: false })
  params: Prisma.JsonValue;

  @ApiProperty({ description: 'Request body', required: false })
  body: Prisma.JsonValue;

  @ApiProperty({ description: 'Client referer', required: false })
  referer: string | null;

  @ApiProperty({ description: 'Date of creation' })
  createdAt: Date;

  @ApiProperty({ description: 'Date of update' })
  updatedAt: Date;

  @ApiProperty({ description: 'Error user', required: false, type: ContentUserEntity })
  user?: ContentUserEntity;

  @ApiProperty({ description: 'Error user', required: false, type: CompanyContentEntity })
  company?: CompanyContentEntity;

  constructor({ user, company, ...data }: Partial<ErrorEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new ContentUserEntity(user);
    }

    if (company) {
      this.company = new CompanyContentEntity(company);
    }
  }
}
