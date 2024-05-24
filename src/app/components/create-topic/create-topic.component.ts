import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-create-topic',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-topic.component.html',
  styleUrl: './create-topic.component.css'
})
export class CreateTopicComponent {

  topicForm: FormGroup;

  topicService: TopicService = inject(TopicService);

  constructor(fb: FormBuilder) {
    this.topicForm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      privacy: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.topicForm.valid) {
      this.topicService.createTopic(this.topicForm.getRawValue())
    } else {
      console.log("Oops! You did wrong");
    }
  }

}
