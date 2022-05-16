import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Dealer } from 'src/app/core/model/dealer/dealer.model';
import { DealerService } from 'src/app/core/services/dealer/dealer.service';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.css']
})
export class DealersComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'addres', 'year', 'status'];
  proveedor: Dealer = { id: "", name: "", addres: "", year: "" }
  showList:boolean=true;
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private dealerService:DealerService) { 

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadAllDealers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadAllDealers(){
    this.dealerService.getDealers().subscribe((resp)=>{
      console.log(resp)
      this.dataSource.data = resp
    })
  }

  getDealersById(id:string){
    this.dealerService.getDealerById(id).subscribe((resp)=>{
      console.log(resp)
      this.proveedor = resp
    })
  }

  editDealer(id:string){
    console.log('editar ' + id)
    if(id.length>0){
      this.showList=false;      
      this.getDealersById(id);
    }
  }

  deleteDealer(id:string){
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
