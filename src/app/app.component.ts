import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChatClientService, ChannelService, StreamI18nService, MessageContext, CustomTemplatesService } from 'stream-chat-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit ,AfterViewInit{
  @ViewChild('customMessageTemplate') messageTemplate!: TemplateRef<MessageContext>;
  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private customTemplatesService: CustomTemplatesService,
  ) {
    const apiKey = 'dz5f4d5kzrue';
    const userId = 'frosty-voice-8';
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZnJvc3R5LXZvaWNlLTgiLCJleHAiOjE3MTAxNzg4OTl9.ElrnUeMZc9qz3QaL30LaNvuQhVJY-cCNUnHI3QEoKOA';
    this.chatService.init(apiKey, userId, userToken);
    this.streamI18nService.setTranslation();
  }

  async ngOnInit() {
    const channel = this.chatService.chatClient.channel('messaging', 'talking-about-angular-3', {
      // add as many custom fields as you'd like
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
      name: 'Talking about Angular',
    });
    await channel.create();
    this.channelService.init({
      type: 'messaging',
      id: { $eq: 'talking-about-angular-3' },
    });

  
  }

  ngAfterViewInit(): void {
    // Register your template
    this.customTemplatesService.messageTemplate$.next(this.messageTemplate);
  }

}
