import { IsNotEmpty } from 'class-validator';

export class CreateCampaignDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  fbPageId: string;
}

export class CampaignDto extends CreateCampaignDto {
  @IsNotEmpty()
  id: string;
}
