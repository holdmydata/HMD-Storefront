import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

function Modal({ isOpen, closeModal, children }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-md" onClose={closeModal}>
        <div className="min-h-screen px-4 text-center font-inter">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 backdrop-blur-xl" />

          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block font-inter w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform  bg-white  rounded-2xl">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;