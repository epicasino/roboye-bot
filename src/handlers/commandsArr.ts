import SixEggCommand from '../commands/funny/6egg';
import EightBallCommand from '../commands/funny/8ball';
import BigBastardCommand from '../commands/funny/bigbastard';
import CrackedCommand from '../commands/funny/cracked';
import PingCommand from '../commands/utility/ping';
import { iCommand } from '../types/types';

// we can find a better way of doing this.
export const commandsArr: iCommand[] = [
  new PingCommand(),
  new SixEggCommand(),
  new EightBallCommand(),
  new BigBastardCommand(),
  new CrackedCommand(),
];
