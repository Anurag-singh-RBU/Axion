import { getCurrent } from '@/app/(auth)/actions'
import React from 'react'
import JoinWorkspaceForm from '@/Features/workspaces/components/joinWorkspaceForm';
import JoinPageDialog from '@/Features/workspaces/components/JoinPageDialog';
import { getMember } from '@/types/members/utils';
import { Client, Databases } from 'node-appwrite';
import { cookies } from 'next/headers';
import { AUTH_COOKIE } from '@/app/(auth)/constants';

interface JoinPageProps {
  params: {
    workspaceId: string;
    inviteCode: string;
  }
}

const JoinPage = async ({ params }: JoinPageProps) => {
  const { workspaceId, inviteCode } = await params;
  const user = await getCurrent();

  if (!user) {
    return <JoinPageDialog type="login-required"/>;
  }

  let isAlreadyMember = false;
  try {
    const session = (await cookies()).get(AUTH_COOKIE);
    if (session?.value) {
      const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        .setSession(session.value);
      const databases = new Databases(client);
      const member = await getMember(databases, workspaceId, user.$id);
      if (member) isAlreadyMember = true;
    }
  } catch {
    // membership check failed — proceed to join form
  }

  if (isAlreadyMember) {
    return <JoinPageDialog type="already-member" workspaceId={workspaceId}/>;
  }

  return (
    <JoinWorkspaceForm workspaceId={workspaceId} inviteCode={inviteCode}/>
  );
}

export default JoinPage