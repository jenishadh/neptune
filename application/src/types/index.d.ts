// components/max-width-wrapper
type MaxWidthWrapperProps = {
  className?: string
  children: React.ReactNode
}

// features/auth/components/auth-wrapper
type AuthWrapperProps = {
  title: string
  description: string
  children: React.ReactNode
  type: "login" | "register"
}

// component/modals/modal
export type ModalProps = {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

// component/modals/alert-modal
export type AlertModalProps = {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

// component/table - CellAction
type CellActionProps = {
  path: string
  label: string
  data: {
    id: string
    name: string
  }
}

// utils - fn remove()
type RemoveProps = {
  deleteHref: string
  setLoading: (loading: boolean) => void
  setOpen: (loading: boolean) => void
  redirect: () => void
}