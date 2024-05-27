import {Component, inject} from '@angular/core';
import {TopicService} from "../../services/topic.service";
import {ActivatedRoute} from "@angular/router";
import {JoinRequest} from "../../shared/data/join-request";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {

  joinRequests: JoinRequest[] = [];

  private topicService = inject(TopicService);

  private topicId!: number;

  constructor(route: ActivatedRoute) {
    // @ts-ignore
    this.topicId = +route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.topicService.getJoinRequests(this.topicId).subscribe(
      (requests: JoinRequest[]) => {
      this.joinRequests = requests;
      console.log(this.joinRequests);

    });
  }

  acceptRequest(id: number): void {
    this.topicService.acceptJoinRequest(id).subscribe(() => {
      this.joinRequests = this.joinRequests.filter(req => req.id !== id);
    });
  }

  rejectRequest(id: number): void {
    this.topicService.rejectJoinRequest(id).subscribe(() => {
      this.joinRequests = this.joinRequests.filter(req => req.id !== id);
    });
  }
}
