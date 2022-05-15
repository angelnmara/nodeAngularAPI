import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Dealer } from 'src/app/core/model/dealer/dealer.model';
import { DealerService } from 'src/app/core/services/dealer/dealer.service';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.css']
})
export class DealersComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'addres', 'year'];
  proveedor: Dealer = { id: "", name: "", addres: "", year: "" }
  showList:boolean=true;

  constructor(private dealerService:DealerService) { }

  ngOnInit(): void {
    this.loadAllDealers();
  }

  loadAllDealers(){
    this.dealerService.getDealers().subscribe((resp)=>{
      console.log(resp)
      this.dataSource.data = resp
    })
  }

}
