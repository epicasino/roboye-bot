import SixEggCommand from '../commands/funny/6egg';
import EightBallCommand from '../commands/funny/8ball';
import BigBastardCommand from '../commands/funny/bigbastard';
import CrackedCommand from '../commands/funny/cracked';
import Crank90sCommand from '../commands/funny/crank90s';
import CriminalCommand from '../commands/funny/criminal';
import DivorcePapersCommand from '../commands/funny/divorcepapers';
import IFwUHeavyCommand from '../commands/funny/fwuheavy';
import InYourFaceCommand from '../commands/funny/inyourface';
import KickTheCheaterCommand from '../commands/funny/kickthecheater';
import PhoenixWrightCommand from '../commands/funny/phoenixwright';
import NotShadmehrCommand from '../commands/funny/notshadmehr';
import PingCommand from '../commands/utility/ping';
import { iCommand } from '../types/types';
import SaltInAPretzelBagCommand from '../commands/funny/saltinapretzelbag';
import ShowerCommand from '../commands/funny/shower';
import WithThisTreasureCommand from '../commands/funny/withthistreasure';

// we can find a better way of doing this.
export const commandsArr: iCommand[] = [
  new PingCommand(),
  new SixEggCommand(),
  new EightBallCommand(),
  new BigBastardCommand(),
  new CrackedCommand(),
  new Crank90sCommand(),
  new CriminalCommand(),
  new DivorcePapersCommand(),
  new IFwUHeavyCommand(),
  new InYourFaceCommand(),
  new KickTheCheaterCommand(),
  new NotShadmehrCommand(),
  new PhoenixWrightCommand(),
  new SaltInAPretzelBagCommand(),
  new ShowerCommand(),
  new WithThisTreasureCommand(),
];
