
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Heart, Twitter } from "lucide-react";
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
    likes: "2.5K",
    reposts: "1.2K",
    views: "12.5K"
  },
  {
    author: "Alex Tech",
    handle: "@alextech",
    content: "Supabase auth is a game changer. Email, social logins, and user management - everything works out of the box!",
    date: "Mar 12",
    likes: "1.8K",
    reposts: "892",
    views: "8.2K"
  },
  {
    author: "Dev Community",
    handle: "@devcommunity",
    content: "Looking for reliable authentication? Supabase Auth provides enterprise-grade security with a developer-friendly API.",
    date: "Mar 10",
    likes: "3.2K",
    reposts: "1.5K",
    views: "15.3K"
  }
];

const TweetCarousel = () => {
  return (
    <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow w-full">
      <CardContent className="p-3 md:p-6">
        <div className="flex items-center gap-2 mb-3 md:mb-6">
          <Twitter className="h-4 w-4 md:h-5 md:w-5 text-launch-cyan" />
          <h3 className="text-base md:text-xl font-semibold text-white">Community Feedback</h3>
        </div>
        <Carousel className="w-full mx-auto">
          <CarouselContent>
            {tweets.map((tweet, index) => (
              <CarouselItem key={index}>
                <div className="p-3 md:p-6 bg-gradient-to-br from-gray-900/90 to-black/90 rounded-xl border border-gray-800 backdrop-blur-sm">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-launch-cyan to-purple-500 flex items-center justify-center shadow-lg ring-2 ring-white/10">
                      <span className="text-white font-semibold text-sm md:text-lg">
                        {tweet.author[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm md:text-lg">{tweet.author}</p>
                      <p className="text-gray-400 text-xs md:text-sm">{tweet.handle}</p>
                    </div>
                  </div>
                  <p className="text-white text-sm md:text-xl leading-relaxed mb-4 md:mb-6 font-medium">{tweet.content}</p>
                  <div className="flex items-center gap-3 md:gap-6 text-gray-400">
                    <div className="flex items-center gap-1 md:gap-2 group cursor-pointer">
                      <MessageCircle className="h-3 w-3 md:h-5 md:w-5 group-hover:text-launch-cyan transition-colors" />
                      <span className="text-xs md:text-sm group-hover:text-white transition-colors">{tweet.reposts}</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 group cursor-pointer">
                      <Heart className="h-3 w-3 md:h-5 md:w-5 group-hover:text-pink-500 transition-colors" />
                      <span className="text-xs md:text-sm group-hover:text-white transition-colors">{tweet.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <span className="text-xs md:text-sm">{tweet.views} views</span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="bg-launch-cyan/10 border-launch-cyan/20 text-launch-cyan hover:bg-launch-cyan/20 -left-4 lg:-left-12" />
            <CarouselNext className="bg-launch-cyan/10 border-launch-cyan/20 text-launch-cyan hover:bg-launch-cyan/20 -right-4 lg:-right-12" />
          </div>
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            <CarouselPrevious className="bg-launch-cyan/10 border-launch-cyan/20 text-launch-cyan hover:bg-launch-cyan/20 static transform-none h-8 w-8" />
            <CarouselNext className="bg-launch-cyan/10 border-launch-cyan/20 text-launch-cyan hover:bg-launch-cyan/20 static transform-none h-8 w-8" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default TweetCarousel;
