import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsDateString, IsNumber, IsOptional } from "class-validator";

export class PositionsTopvisorDto {

    // ID проекта
    @IsNumber()
    @Type(() => Number)
    project_id: number

    // Индекс региона
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]), { toClassOnly: true })
    @IsArray({message:"регионы не указаны"})
    regions_indexes: number[]

    // Произвольные даты проверок
    //(dates является обязательным, если date1 и date2 не указаны)
    @IsOptional()
    @IsDateString()
    dates: string[]

    // Крайние даты периода
    //(date1 и date2 являются обязательным, если dates не указан)
    @IsDate()
    @Type(()=>Date)
    date1: Date

    @IsDate()
    @Type(()=>Date)
    date2:Date

    // @IsOptional()
    // orders:any[]=[{"name":"date","direction":"DESC"}]
    // @IsOptional()
    // fields:any[] = ["date","info","sum"]
}

