import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../shared/task.service';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';






@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public showAdd = true;
  Tasks: any = [];

  constructor(private router: Router,private route: ActivatedRoute,private taskService : TaskService, private dataService: DataService) {
    console.log('constructor')
    
  }

  goToAdd(){
    this.router.navigate(['addOrEdit']);
    
  }
  ngOnInit() {
    this.taskService.getTaskList().subscribe((res) => {
      console.log(res)
      this.Tasks = res;
    })
  }
  ionViewWillEnter(){
    console.log('main will enter')
    let response = this.dataService.getDataAfterAdd();
    console.log('response : ',response)
    if(response && response.length > 0){
      this.Tasks =  response[0].data;
    }
  }

  deleteTask(id,slidingItem){
    console.log('id delete : ',id)
    this.taskService.deleteTask(id).subscribe((res) => {
      console.log('res ',res)
      this.Tasks = this.Tasks.filter(task => task.id !== id);
      setTimeout(() => {
        slidingItem.close();
      }, 100);
    })
  }
  
  editTask(data,slidingItem){
    // console.log('id edit : ',data)
    data.slidingItem = slidingItem;
    this.dataService.setData(data.id, data);
    setTimeout(() => {
      slidingItem.close();
    }, 500);
    // this.router.navigateByUrl('/addOrEdit'+data.id);
    this.router.navigate(['addOrEdit/'+data.id]);

  }

}
