
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addCategory } from "@/utils/offerData";
import { CreditCard, Fuel } from "lucide-react";

// Define form schema
const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters" }),
  icon: z.string().min(1, { message: "Icon is required" }),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  onCategoryAdded: () => void;
}

const CategoryForm = ({ onCategoryAdded }: CategoryFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      icon: "💼",
    },
  });

  const emojiOptions = ["💻", "👕", "🍴", "✈️", "✨", "🏠", "💼", "📱", "🎮", "🎁", "🚗", "📚", "💳", "⛽"];

  const onSubmit = async (values: CategoryFormValues) => {
    setIsSubmitting(true);

    try {
      // Ensure values are not optional - name and icon are required by the addCategory function
      const categoryData = {
        name: values.name,
        icon: values.icon
      };
      
      addCategory(categoryData);
      
      form.reset({
        name: "",
        icon: "💼",
      });

      toast({
        title: "Success",
        description: "Category has been added successfully",
      });

      onCategoryAdded();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Electronics, Fashion, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Icon</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {emojiOptions.map((emoji) => (
                      <Button
                        key={emoji}
                        type="button"
                        variant={field.value === emoji ? "default" : "outline"}
                        className="w-10 h-10 p-0 text-xl"
                        onClick={() => form.setValue("icon", emoji)}
                      >
                        {emoji}
                      </Button>
                    ))}
                    <Button
                      type="button"
                      variant={field.value === "card" ? "default" : "outline"}
                      className="w-10 h-10 p-0"
                      onClick={() => form.setValue("icon", "card")}
                    >
                      <CreditCard className="h-5 w-5" />
                    </Button>
                    <Button
                      type="button"
                      variant={field.value === "fuel" ? "default" : "outline"}
                      className="w-10 h-10 p-0"
                      onClick={() => form.setValue("icon", "fuel")}
                    >
                      <Fuel className="h-5 w-5" />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            Add Category
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
