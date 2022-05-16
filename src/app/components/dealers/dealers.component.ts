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
  displayedColumns: string[] = ['id', 'name', 'addres', 'year', 'status'];
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

  editDealer(id:number){
    console.log('editar')
  }

  deleteDealer(id:number){
    console.log('borrar')
    this.dealerService.deleteDealer(id).subscribe((resp)=>{
      console.log(resp);
      this.loadAllDealers();
    })
  }

  newDealer(){
    console.log('nuevo diler')
    this.showList=false;
  }

  returnToList(){
    this.showList=true;

  }

  cleanDealer(){
    this.proveedor.name=''
    this.proveedor.addres=''
    this.proveedor.year=''
  }

  validaObligatorios(element:any){
    var visible:boolean=false;
    if(element.name.length>0 && element.addres.length>0 && element.year.length>0){
      visible = true;
    }else{
      visible=false;
    }  
    return visible;
  }

  saveDealer(){
    this.dealerService.saveDealer(this.proveedor).subscribe((resp)=>{
      console.log(resp);
      this.loadAllDealers();
      this.cleanDealer();
      this.returnToList();
    })
  }

}
