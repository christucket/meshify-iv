# thoughts
I'm not really a twitter user, but the api (as expected from a company like Twitter) was fairly straight forward. I used the recent tweets api just because it was the first one I found. There was an archive one and I believe just a regular search but I figured seeing "whats now" was the cooler idea.
 
The "no duplicates" requirement was strange for me since I assumed twitter wouldn't send duplicates back, or that the tweet id would indicate that it was a duplicate or not. Either way, I saw tons of tweets with the same text with different `id`s. I found the retweet filter (took a bit to understand that retweets were showing up like that) and it parsed out a lot of the noise, however I still saw some people (I'm assuming) manually copy/pasting text to create a duplicate. If those duplicates are not allowed, I can go back and change my backend to keep requerying until I have 100+ unique tweets. I would use the pagination that twitter supplies in their `meta` object to go back in pages to grab more tweets, compare the new list to the old list and union the uniques together. I added the select input element because I initially thought I had to do the backend looping but it turns out filtering retweets worked pretty well. I kept the options in there to show the difference between no filter, filter, and the opposite of the filter.

 ```json
    "meta": {
        "newest_id": "1397965069934239745",
        "oldest_id": "1397830622475816960",
        "result_count": 100,
        "next_token": "b26v89c19zqg8o3foswtilv82swqixjf55tw76wxsfd6l"
    }
```

I also thought allowing different hashtags could be useful (for testing, for exploring) so I added a simple input to allow changing it. 

I personally think showing more words (I did 100) would be better, I included a constant in the code at the top of the `App.tsx` file. I added some slightly more complicated logic than the requirements wanted for the top-20 words since I implemented top 100 first. I wanted to include more words but still filter out ones that just didn't have as high as a frequency as the others. If I were to go back and do a strict 20 words, it would just be a simple sort/splice to get the first 20.

 
# shortcuts
- Like I said in my interview, styling is not my forte, I tried to do something simple.
- I created a tiny backend for the api, I didn't put much effort or error handling into it. I just wanted a quick proxy because CORS is a necessary evil in today's world.
- It's kind of hard with the interviews to know if using external libraries is a good or bad sign. I opted to use some for the complicated parts (wordcloud)
  I started with the Twitter embed code but after realising the twitter js didn't listen for changes to the DOM, I just swapped over to a library to handle refreshing the twitter js code. I believe I just needed to find the `<script>` element, remove it, and add it back after every update but I figured since I didn't know for sure, I'd just trust some stranger online. :)
- I have no idea why but the react-wordcloud library/export would not work in jest. It kept complaining about an object being returned and not the component. I could fix it by doing `ReactWordcloud.default` but then the app didn't work. I tested this behavior in a fresh create-react-app project and it still happened. My guess is that jest is configured with an older es/js syntax or something? I couldn't figure it out so I just mocked the whole library. I unfortunately couldn't put a test on the word click functionality though. I'm down to fix the issue if I find something online or get some help but for now, and since this project (hopefully) isn't being graded as a production project, I figured it was ok.
- I think if it were going to be distributed and show this off as a useful app, I would probably implement react-router and put the hashtag in the url, defaulting it to IoT to keep with the requirements. I mentioned this in the interview but I like adding things to improve functionality but when given requirements. I try not to add too many unnecessary things that might take awhile to remove if someone disagrees with the idea. If a PR suggests it, I’d be open to going back and fixing it or adding a task in a backlog.

