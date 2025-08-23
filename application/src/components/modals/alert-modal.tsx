'use client'

import { AlertModalProps } from '@/types'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { Modal } from '@/components/modals/modal'

export function AlertModal({ title, description, isOpen, onClose, onConfirm, loading }: AlertModalProps) {
  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          {loading && <Icons.loaderCircle className="size-4 animate-spin" />}
          Delete
        </Button>
      </div>
    </Modal>
  )
}
