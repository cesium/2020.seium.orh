import Image from 'next/image'

import Dashboard from "/components/moonstone/Dashboard";
import Form from '/components/moonstone/Form';
import Input from '/components/moonstone/Input';
import Heading from '/components/moonstone/Heading';
import Button from '/components/utils/Button';
import CodeInput from '/components/moonstone/CodeInput';
import CheckpointTracker from '/components/moonstone/CheckpointTracker';

export default function Profile() {
  return (
    <Dashboard href="profile" title="User Profile" description="Hi John, welcome to your profile">
      <div className="grid-cols-2 overflow-hidden">
        <div className="col-span-1 w-full md:w-1/2 float-left">
          <Heading text="User Profile">
            <div className="w-24">
              <Button bg_color="aqua" fg_color="white" text="Edit"></Button>
            </div>
          </Heading>
          <div className="pl-6">          
            <Image src="/images/speakers/joaooliveira.png" className="rounded-full overflow-hidden" width="220" height="220" />
          </div>
          <Form>
              <Input
                  text="NAME"
                  id="name"
                  name="name"
                  bgColor="white"
                  fgColor="black"
              />
              <Input
                  text="USERNAME"
                  id="username"
                  name="username"
                  bgColor="white"
                  fgColor="black"
              />
              <Input
                  text="PASSWORD"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  bgColor="white"
                  fgColor="black"
              />
              <a href="#" className="pl-6 text-aqua h-auto inline-block underline">Reset Password</a>
          </Form>
        </div>

        <div className="col-span-1 w-full md:w-1/2 float-right md:pl-6">
          <div>
            <Heading text="Achievements"></Heading>

            <div className="grid-cols-2 overflow-hidden">
              <div className="col-span-1 float-left w-1/2">
                💰170 Tokens
              </div>
              <div className="col-span-1 float-left w-1/2">
                🏅68 Badges
              </div>
            </div>

            <div className="grid-cols-2 overflow-hidden mt-4">
              <div className="col-span-1 float-left w-1/2">
                🏆16 Entries Final Draw
              </div>
              <div className="col-span-1 float-left w-1/2">
                🏁Level 3 Checkpoint
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Heading text="Checkpoints"></Heading>
            <p><b>Level 1</b> 5 companies &rarr; +10 entries</p>
            <p><b>Level 2</b> 10 companies &rarr; +20 entries</p>
            <p><b>Level 3</b> 15 companies &rarr; +40 entries</p>
            <p><b>Level 4</b> 20 companies &rarr; +100 entries</p>

            <CheckpointTracker checkpoints={5} progress={3}/>

            <p>You just need 4 more bages to go to Level 4 (and win 10+ entries to the final draw). Hurry!</p>
            <CodeInput/>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}