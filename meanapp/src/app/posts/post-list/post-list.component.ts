import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostsService } from "../post.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
    // posts = [
    //     {title: 'First Post', content: 'This is first post\'s content.'},
    //     {title: 'Second Post', content: 'This is second post\'s content.'},
    //     {title: 'Third Post', content: 'This is third post\'s content.'}
    // ];
    posts: Post[] = [];
    private postsSub: Subscription | undefined;

    constructor(public postsService: PostsService){}

    ngOnInit(){
        this.posts = this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateLisner()
            .subscribe((post: Post[]) => {
                this.posts = post;
            });
    }

    ngOnDestroy() {
        if (this.postsSub){
            this.postsSub.unsubscribe();
        }
    }
}