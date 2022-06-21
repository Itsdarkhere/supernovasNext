import { RouteNames } from "./backendapi-context";
import { getTargetComponentSelector, getTargetComponentSelectorFromRouter, launchSignupFlow } from "./global-context";
import { SwalHelper } from "./helpers/swal-helper";

export function showCreateAccountToPostDialog() {
    return SwalHelper.fire({
      target: getTargetComponentSelector(),
      icon: "info",
      title: `Create an account to post`,
      html: `It's totally anonymous and takes under a minute.`,
      showCancelButton: true,
      showConfirmButton: true,
      focusConfirm: true,
      customClass: {
        confirmButton: "btn btn-light",
        cancelButton: "btn btn-light no",
      },
      confirmButtonText: "Create an account",
      cancelButtonText: "Nevermind",
      reverseButtons: true,
    }).then((res: any) => {
      if (res.isConfirmed) {
        launchSignupFlow();
      }
    });
  }

  export function showCreateProfileToPostDialog(router: Router) {
    SwalHelper.fire({
      target: getTargetComponentSelectorFromRouter(router),
      icon: "info",
      title: `Complete your profile to post`,
      html: `You can be whoever you want to be.`,
      showCancelButton: true,
      showConfirmButton: true,
      focusConfirm: true,
      customClass: {
        confirmButton: "btn btn-light",
        cancelButton: "btn btn-light no",
      },
      confirmButtonText: "Complete Your Profile",
      cancelButtonText: "Nevermind",
      reverseButtons: true,
    }).then((res: any) => {
      if (res.isConfirmed) {
        router.navigate(["/" + RouteNames.UPDATE_PROFILE], { queryParamsHandling: "merge" });
      }
    });
  }

  export function showCreateProfileToPerformActionDialog(router: Router, action: string) {
    SwalHelper.fire({
      target: getTargetComponentSelectorFromRouter(router),
      icon: "info",
      title: `Complete your profile to ${action}`,
      html: `You can be whoever you want to be.`,
      showCancelButton: true,
      showConfirmButton: true,
      focusConfirm: true,
      customClass: {
        confirmButton: "btn btn-light",
        cancelButton: "btn btn-light no",
      },
      confirmButtonText: "Complete Your Profile",
      cancelButtonText: "Nevermind",
      reverseButtons: true,
    }).then((res: any) => {
      if (res.isConfirmed) {
        router.navigate(["/" + RouteNames.UPDATE_PROFILE], { queryParamsHandling: "merge" });
      }
    });
  }