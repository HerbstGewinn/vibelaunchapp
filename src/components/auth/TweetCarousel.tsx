
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Calendar, Twitter } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const tweets = [
  {
    author: "Sarah Developer",
    handle: "@sarahdev",
    content: "Just implemented auth in my app with @supabase in less than 30min. It's hands down the simplest way to setup authentication!",
    date: "Mar 15",
    likes: "2.5K"
  },
  {
    author: "Alex Tech",
    handle: "@alextech",
    content: "Supabase auth is a game changer. Email, social logins, and user management - everything works out of the box!",
    date: "Mar 12",
    likes: "1.8K"
  },
  {
    author: "Dev Community",
    handle: "@devcommunity",
    content: "Looking for reliable authentication? Supabase Auth provides enterprise-grade security with a developer-friendly API.",
    date: "Mar 10",
    likes: "3.2K"
  }
];

const TweetCarousel = () => {
  return (
    <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow w-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Twitter className="h-5 w-5 text-launch-cyan" />
          <h3 className="text-xl font-semibold text-white">Community Feedback</h3>
        </div>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {tweets.map((tweet, index) => (
              <CarouselItem key={index} className="md:basis-1/1">
                <div className="p-4 bg-launch-dark rounded-xl border border-gray-800">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-launch-cyan/20 to-purple-500/20 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {tweet.author[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{tweet.author}</p>
                      <p className="text-gray-400 text-sm">{tweet.handle}</p>
                    </div>
                  </div>
                  <p className="text-white mb-4 text-lg">{tweet.content}</p>
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{tweet.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{tweet.likes}</span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="bg-launch-cyan/10 border-launch-cyan/20 text-launch-cyan hover:bg-launch-cyan/20" />
            <CarouselNext className="bg-launch-cyan/10 border-launch-cyan/20 text-launch-cyan hover:bg-launch-cyan/20" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default TweetCarousel;
