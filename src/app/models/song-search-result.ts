import { SongModel } from './song-model';

export interface SongSearchResult {
    resultCount?: number;
    results?: SongModel[];
}