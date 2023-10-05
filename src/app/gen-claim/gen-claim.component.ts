import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { timer } from 'rxjs';

import {  ProcessInstanceVariable, ProcessPayloadCloud, StartProcessCloudService,
  TaskListCloudService, ProcessTaskListCloudService,
  TaskQueryCloudRequestModel,
  ProcessInstanceCloud} from '@alfresco/adf-process-services-cloud';

import {MyProcessCloudService} from '../services/my-process-cloud.service';
import { repeat, switchMap, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-gen-claim',
  templateUrl: './gen-claim.component.html',
  styleUrls: ['./gen-claim.component.scss']
})
export class GenClaimComponent implements OnInit {

  bIsLoading: boolean=true;
  bIsStarted:boolean=false;
  bIsComplete:boolean=false;
  claimId:string = "not set";
  claimFolderName:string = "/blah/blah";
  processId: string;
  tsStart: string;
  tsEnd: string;

  constructor( private _router:Router
    , private _procCloudService:MyProcessCloudService
    , private _startProcCloud:StartProcessCloudService

  ) { }

  ngOnInit(): void {
    this.bIsLoading = true;
    this.startGenClaim();
  }

  /**
   * polling for task to complete adapted from
   * https://stackoverflow.com/questions/74031341/http-polling-with-rxjs-with-initial-call-different-from-the-following-ones
   */
  startGenClaim() {

    /**
     * Start APA Process
     */

    const _payload: ProcessPayloadCloud = new ProcessPayloadCloud( {
      name: "Create or Get ClaimFolder",
      processDefinitionKey: "Process_TU4VxY8T",
      variables: {"companyName": "GPC"}
    });

    this._startProcCloud.startProcess("claims-test",_payload).subscribe(
      (proc:ProcessInstanceCloud) => {
        this.bIsLoading = false;
        this.tsStart = new Date().toISOString();
        this.bIsStarted = true; 
        this.processId = proc.id;
        console.log("********************* Task Started:", JSON.stringify(proc));
        let n:number=0;
        timer(0,250).pipe(       
          tap(() => console.log("iteration: ",++n," at ", new Date().toISOString())),
          switchMap(_ => this._procCloudService.getProcessInstanceById("claims-test",this.processId)),
          takeWhile(p => p.status !== 'COMPLETED',true)
        ).subscribe(
          result => {
            console.log("******************** create claim completed... Get variables");
            this._procCloudService.getProcessInstanceVariablesById("claims-test",this.processId).subscribe(
              (vars:any[]) => {
                for(let v of vars) {
                  if(v.entry.name == "claimID") { this.claimId = v.entry.value; }
                  else if(v.entry.name == "claimFolderName") { this.claimFolderName = v.entry.value; }
                }
                this.tsEnd = new Date().toISOString();
                this.bIsComplete = true;
              }
            )
          });
      }
    )
  }

}
