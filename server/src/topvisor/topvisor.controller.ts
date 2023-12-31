import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { TopvisorService } from './topvisor.service';
import { FindProjectsDto } from 'src/general/dto/find-projects.dto';
import { PositionsTopvisorDto } from './dto/positions-topvisor.dto';
import { FindProjectsTopvisorDto } from './dto/find-projects-topvisor.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TopvisorProject } from './entities/topvisor-project.entity';
import { TResult } from './entities/result.entity';

@ApiTags('topvisor')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('topvisor')
export class TopvisorController {
  constructor(private readonly topvisorService: TopvisorService) { }


  // database------------------------------------------------------------------------------
  @Get('projects')
  @ApiOperation({ summary: "получить список проектов" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [TopvisorProject] })
  async findProjects(@Query() findProjectsDto: FindProjectsTopvisorDto) {
    return await this.topvisorService.findProjects(findProjectsDto);
  }

  // получить список позиций
  @ApiOperation({ summary: "получить список позиций" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type:[TResult] })
  @Get('positions')
  async findPositions(@Query() positionsTopvisorDto: PositionsTopvisorDto) {

    const positions = await this.topvisorService.findPositions(positionsTopvisorDto);

    return positions
  }





  // remote api-------------------------------------------------------------
  @ApiOperation({ summary: "api получить список проектов с удаленного апи" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @Get('fetch/projects')
  async fetchProjects(@Query() findProjectsDto: FindProjectsTopvisorDto) {
    let projects = await this.topvisorService.fetchProjects(findProjectsDto);
    // save projects in database
    //this.topvisorService.saveProjectsDatabase(projects.result)


    return projects
  }


  // получить список позиций
  @ApiOperation({ summary: "api получить список позиций с удаленного апи" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @Get('fetch/positions')
  async checkPositions(@Query() positionsTopvisorDto: PositionsTopvisorDto) {

    const position = await this.topvisorService.fetchPositions(positionsTopvisorDto);
    this.topvisorService.savePositionDatabase(position.result)

    return position
  }
}
