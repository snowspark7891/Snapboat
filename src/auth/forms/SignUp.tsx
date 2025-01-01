import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { signUpValidation } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccountMutation,
  useSignInAccountMutation,
} from "@/lib/react-quary/quaresandMutaition";
import { useUserContext } from "@/context/authcontext";
import { useNavigate } from "react-router-dom";

//  const signUpValidation = z.object({
//    username: z.string().min(2).max(50),
//  });

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserloading } = useUserContext();
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccountMutation();
  const { mutateAsync: signInUserAccount, isPending: isSignIn } =
    useSignInAccountMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signUpValidation>) {
    //function performed on clicking the submit(here on click it create a new user)
    const newUser = await createUserAccount(values);
    //now the user is being created
    if (!newUser) {
      return toast({
        title: "SignUp failed ! Please try again",
      });
    }

    const session = await signInUserAccount({
      email: values.email,
      password: values.password,
    });
    console.log("session : ", session);

    if (!session) {
      return toast({
        title: "SignIn failed ! Please try again",
      });
    }
    console.log("now session is created");

    const isloggedIn = await checkAuthUser();
    console.log(isloggedIn);

    if (isloggedIn) {
      form.reset();
      navigate("/");
    } else {
      toast({ title: "SignUp failed ! Please try again" });
    }
  }
  //after defining the form  now we can create out own form

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-3 sm:pt-10">
          create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular">
          please enter your detail
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="shad-input"
                    placeholder="abc@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    placeholder="Your_password**"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Enter your detail and signUp please.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader /> loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            alredy have an account ?
            <Link
              to={"/sign-in"}
              className="text-primary-600 text-small-semibold ml-1"
            >
              {" "}
              log-in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUp;
