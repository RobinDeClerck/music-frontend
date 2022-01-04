import { Artist } from "./artist";
import { Song } from "./song";

export interface FilledAlbum {
    maid: string
    name: string
    image: string
    genre: string
    artist: Artist
    songs: Song[]
    release: string
}
