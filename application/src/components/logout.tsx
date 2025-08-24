import { Button } from '@/components/ui/button'
import { logout } from '@/features/auth/actions'
import { useRouter } from 'next/navigation'
import { Icons } from './icons'

export function Logout() {
  const router = useRouter()

  async function handleLogout(){
    await logout()
    router.push('/login')
  }
  return (
    <Button variant="destructive" onClick={handleLogout}>
      <Icons.logOut />
      Logout
    </Button>
  )
}
