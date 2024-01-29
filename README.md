Inspiration 💡
Our project was inspired by the warm experiences of the past, where music played on boomboxes brought people together in shared moments of joy. We aimed to recapture this sense of nostalgia, blending the charm and simplicity of the OG music gatherings with the inclusivity and innovation of modern technology. By reviving the spirit of the classic boombox, our project seeks to rekindle the collective joy of music in a way that resonates with both past and present generations.

What it does 🤝
Our revamped experience redefines the music experience in groups by integrating modern technology. It democratizes music selection through a voting system, allowing participants to collectively choose songs via an intuitive, user-friendly interface. This fusion of nostalgic charm and contemporary functionality creates a unique, inclusive environment where everyone's musical taste has a chance to shine where everyone’s music taste is given a voice instead of an individual.

How we built it 👷
We built our system by using the Spotify API via the Spotipy Python package, enabling us to access a vast music library and use Spotify's recommendation algorithms. As any DJ can tell you, every crowd is different. We fine-tuned the recommendation parameters after each communal vote to ensure the music selection remained dynamic and reflective of the current session’s taste. The backend, developed with Flask, efficiently managed the voting system and user interactions, while the Next.js frontend provided a seamless, nostalgic yet modern user experience, making music selection engaging and intuitive for all participants.

Challenges we ran into 🚧
Unfortunately, we got rate limited by the Spotify API more than once which led to us having delays in bug-fixing, and ultimately a non-functional product.

Accomplishments that we're proud of 🍾
We're proud of how seamlessly we integrated diverse technologies to recreate the communal spirit of the classic boombox with our own modern twist. Our successful implementation of the Spotify API for dynamic music recommendations, coupled with the Flask backend for real-time voting, taught us so much technically. Additionally, crafting an intuitive and nostalgically themed user interface with Next.js taught us a lot about how to appeal to our audience in the best way possible. We loved using voting to add something we thought was innovative and different that we haven’t seen before.

What we learned 🎓
The most important lesson we learned is to be wary of third party libraries before using them. Several issues have been reported with Spotipy improperly handling errors and spamming the Spotify API, causing a rate limit. If we knew this before using the library, we would have written HTTPS requests ourselves, leaving all behavior in our control.
