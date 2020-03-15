import { Injectable } from '@angular/core';
import { faRedoAlt, faTimesCircle, faTimes, faTerminal } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  refresh = faRedoAlt;
  timesCircle = faTimesCircle;
  times = faTimes;
  terminal = faTerminal;
}
