# Real-Time Collaborative Note Editor (Like Google Docs)

The UI will be as plain as possible.

Below is a draft that I came up with.
It includes my goals with the project.

### Features:

- [x] Real-time collaborative editing.
- [x] Document versioning and history.
- [x] ~~Conflict resolution and merging. (Is this even necessary after the switch from polling to real time.?)~~
      Later note: Above is not necessary.
- [ ] ~~User presence and activity indicators.~~
- [x] WebSocket-based communication for real-time updates.
- [x] Document ownership
- [ ] ~~Encryption for the docs (Won't do because it's too slow that way. I'd have to give up on this app being real-time)~~
- [x] Better storage for docs (file based probably)
- [x] Better UI
- [x] Homepage

Findings and notes to myself after -mostly- finishing the project:
It's a big overhead to send the user cursor coordinates -especially real time-.
Throttling could be used to not cause overhead on the websocket channel, but still, any extra re-render is causing disturbance on the writing experience.
As a person who could write probably a tad bit faster than average, I'm happy with current UX of writing.
So I'll not introduce relatively unnecessary features and hinder the performance more.

There is probably a better way to broadcast the changes of a file to all users who're accessing that file at a time.
I'll have to research and find that "better" way.
Because I believe it's important to have these docs be end-to-end encrypted.
(Side note here: It is also -most likely- stupid to do encrypting real-time.)
In the current state of the application this decreases the performance to a place where it can cause disturbances. So a won't do until I figure out a better way.

Maybe I can consider having two web socket channels, one for user presence and one for the real-time text broadcasting so that each user gets real time updates.
But above would increase the consumption of resources significantly. So needs to be tested.
