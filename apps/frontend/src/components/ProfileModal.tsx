import { Dialog } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "~/utils/api";
import { useSession } from "~/hooks/useSession";
import Modal from "./Modal";

const changeNameSchema = z.object({
  newName: z.string().min(3, "The name must be at least 3 characters long"),
});
type ChangeNameType = z.infer<typeof changeNameSchema>;

export default function ProfileModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  function closeModal() {
    setIsOpen(false);
  }

  const apiContex = api.useContext();
  const changeNameMutation = api.profile.changeName.useMutation({
    onSuccess: () => {
      apiContex.auth.invalidate().catch((err) => {
        console.error(err);
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeNameType>({
    resolver: zodResolver(changeNameSchema),
  });

  const session = useSession();

  const onSubmit = handleSubmit(({ newName }) => {
    changeNameMutation.mutate({ newName });
  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-base-content"
      >
        Your Profile
      </Dialog.Title>
      {session.authenticated && (
        <>
          <div>
            <p className="text-base-content">
              <b>Name:</b> {session.user.name}
            </p>
            <p className="text-base-content">
              <b>Address:</b> {session.user.address}
            </p>
          </div>
          <div className="divider"></div>
          <div className="mt-4 flex flex-col gap-10">
            <div>
              <label className="label">
                <span className="label-text-alt">Insert new name</span>
              </label>
              <label className="input-group">
                <span className="bg-accent">Name</span>
                <input
                  {...register("newName")}
                  className={"input-accent input input-md w-full text-lg"}
                  autoComplete="off"
                />
              </label>
              <label className="label">
                {errors.newName && (
                  <span className="label-text-alt text-error">
                    {errors.newName.message}
                  </span>
                )}
              </label>
            </div>
            <button
              type="button"
              className="btn-outline btn-info btn-sm btn"
              onClick={() => void onSubmit()}
            >
              Change name
            </button>
          </div>
        </>
      )}

      <div className="mt-4">
        <button
          type="button"
          className="btn-outline btn-success btn-sm btn mt-6"
          onClick={closeModal}
        >
          Done!
        </button>
      </div>
    </Modal>
  );
}
