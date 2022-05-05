
/* ————————— Copyright (c) 2022 toastythetoaster. All rights reserved. —————————
 *
 * SpotifyAntiPause Plugin
 *
 * ————————————————————————————————————————————————————————————————————————————— */

import { UPlugin } from '@classes';
import { suppressErrors } from '@util';
import { getByProps } from '@webpack';
import { instead, unpatchAll } from '@patcher';

class SpotifyAntiPause extends UPlugin {
  start(): void {
    suppressErrors(this._patchSpotify.bind(this))(this.promises);
  }

  stop(): void {
    unpatchAll('SpotifyAntiPause');
  }

  _patchSpotify(): void {
    instead('SpotifyAntiPause', getByProps('SpotifyAPI'), 'pause', () => {
      return;
    });
    instead('SpotifyAntiPause', getByProps('wasAutoPaused'), 'wasAutoPaused', () => {
      return false;
    });
  }
}

module.exports = SpotifyAntiPause;
