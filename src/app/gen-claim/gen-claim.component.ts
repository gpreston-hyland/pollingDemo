import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { timer } from 'rxjs';

import {  ProcessInstanceVariable, ProcessPayloadCloud, StartProcessCloudService,
  TaskListCloudService, ProcessTaskListCloudService,
  TaskQueryCloudRequestModel} from '@alfresco/adf-process-services-cloud';

import {MyProcessCloudService} from '../services/my-process-cloud.service';

@Component({
  selector: 'app-gen-claim',
  templateUrl: './gen-claim.component.html',
  styleUrls: ['./gen-claim.component.scss']
})
export class GenClaimComponent implements OnInit {

  bIsLoading: boolean=true;
  bIsStarted:boolean=false;
  bIsComplete:boolean=false;
  claimId:string;
  claimFolderName:string;
  processId: string;

  constructor( private _router:Router
    , private _procCloudService:MyProcessCloudService
    , private _startProcCloud:StartProcessCloudService

  ) { }

  ngOnInit(): void {
    this.bIsLoading = true;
    // this.startGenClaim();
  }

  startGenClaim() {

    
  }

}
