import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { facilities } from 'src/models/facilities';
import { Person } from 'src/models/Person';
import { facilitiesService } from 'src/services/facilities.service';

class DataTablesResponse {
  data?: any[];
  draw?: number;
  recordsFiltered?: number;
  recordsTotal?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project6';
  lifacilities: facilities[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  persons?: Person[];
  @ViewChild(DataTableDirective)
  dtElement?: DataTableDirective;

constructor(private http:HttpClient){

}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post<DataTablesResponse>(
            'https://xtlncifojk.eu07.qoddiapp.com/',
            dataTablesParameters, {}
          ).subscribe(resp => {
            debugger
            this.persons = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
    };


  }

  rerender(){
    this.http
    .post<DataTablesResponse>(
      'https://xtlncifojk.eu07.qoddiapp.com/',{}
    ).subscribe(resp => {
      debugger
      this.persons = resp.data;
      this.dtTrigger.next(this.persons);
    });

  }
}
