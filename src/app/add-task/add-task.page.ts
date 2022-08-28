import { Component, OnInit,NgZone  } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../shared/task.service';
import { Task } from '../shared/task';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {

  public data:  any = {description:"",title:"",due_date:"",id:""};
  public isEdit : boolean = false
  private zone: NgZone
  constructor(private router:Router,private route: ActivatedRoute,private taskService : TaskService, private dataService: DataService) { 
    // console.log('query: ')
    // console.log(this.route.snapshot.paramMap.get('id'));
  }
  
  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.data = this.route.snapshot.data['special'];
      this.isEdit = true
    }
    else{
      this.isEdit = false
    }
  }
  goBack(){
    this.router.navigate(['/home/todolist']);
  }
  addOrEditTask(){
    
    if(this.isEdit){
      let editedTask = this.data;
      this.taskService.updateTask(editedTask.id,editedTask).subscribe((res) => {
        this.dataService.setDataAfterAdd(res);
        this.router.navigate(['/home/todolist']);
      }
      )

    }
    else{
      let task = this.data;
      if(!task.title || !task.description || !task.due_date){
        alert('Please fill all fields')
        return
      }
      this.taskService.addTask(task).subscribe((res) => {
        this.dataService.setDataAfterAdd(res);
        this.router.navigate(['/home/todolist']);
      })

    }
  }

}
