import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { timer } from 'rxjs';

import {  ProcessInstanceVariable, ProcessPayloadCloud, StartProcessCloudService,
  TaskListCloudService, ProcessTaskListCloudService,
  TaskQueryCloudRequestModel,
  ProcessInstanceCloud} from '@alfresco/adf-process-services-cloud';

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

    //
    // Start APA Process
    //
    const _payload: ProcessPayloadCloud = new ProcessPayloadCloud( {
      name: "Create or Get ClaimFolder",
      processDefinitionKey: "Process_TU4VxY8T",
      variables: {"companyName": "GPC"}
    });

    this._startProcCloud.startProcess("claims-test",_payload).subscribe((task:ProcessInstanceCloud) => {
      this.bIsLoading = false;
      this.bIsStarted = true;
    })

  }

}
