"use client";

import { User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import userAvatarMock from '@/public/assets/mocks/user-avatar-mock.svg'
import { Button } from '@/shared/components/ui'
import { cn } from '@/shared/lib/utils'

import { AuthModal } from './modal/auth-modal/auth-modal'


interface Props {
  className?: string;
}

export const ProfileButton = ({ className }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status: sessionStatus, update } = useSession();

  return (
    <>
      <AuthModal open={open} onClose={() => setOpen(false)} />
      {session ? (
        <Link href="/profile">
          <Button
            className={cn(className, "flex items-center gap-2", {
              "w-[120px]": loading,
            })}
            variant="secondary"
            loading={loading}
          >
            <Image
              src={session?.user?.image || userAvatarMock}
              alt="profile"
              width={28}
              height={28}
              className="rounded-full"
            />{" "}
            Profile
          </Button>
        </Link>
      ) : (
        <Button
          className={cn(className, "flex items-center gap-1", {
            "w-[120px]": loading || sessionStatus === "loading",
          })}
          variant="outline"
          onClick={() => setOpen(true)}
          loading={loading || sessionStatus === "loading"}
        >
          <User size={16} />
          Sign in
        </Button>
      )}
    </>
  );
};
