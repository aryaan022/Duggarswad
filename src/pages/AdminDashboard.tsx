import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Edit, LogOut, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prep_time: number;
  cook_time: number;
  servings: number;
  image_url: string;
  status: string;
  submitted_by: string;
  submitted_at: string;
}

const AdminDashboard = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    prep_time: 0,
    cook_time: 0,
    servings: 0,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is logged in
    const adminSession = localStorage.getItem("adminSession");
    if (!adminSession) {
      navigate("/admin/login");
      return;
    }

    fetchRecipes();
  }, [navigate]);

  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      setRecipes(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch recipes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateRecipeStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const adminSession = JSON.parse(localStorage.getItem("adminSession") || "{}");
      
      const { error } = await supabase
        .from("recipes")
        .update({
          status,
          reviewed_at: new Date().toISOString(),
          reviewed_by: adminSession.email,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Recipe ${status} successfully`,
      });

      fetchRecipes();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${status} recipe`,
        variant: "destructive",
      });
    }
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setEditForm({
      title: recipe.title,
      description: recipe.description || "",
      ingredients: recipe.ingredients.join(", "),
      instructions: recipe.instructions.join(". "),
      prep_time: recipe.prep_time || 0,
      cook_time: recipe.cook_time || 0,
      servings: recipe.servings || 0,
    });
  };

  const saveEditedRecipe = async () => {
    if (!editingRecipe) return;

    try {
      const { error } = await supabase
        .from("recipes")
        .update({
          title: editForm.title,
          description: editForm.description,
          ingredients: editForm.ingredients.split(",").map(i => i.trim()),
          instructions: editForm.instructions.split(".").map(i => i.trim()).filter(i => i),
          prep_time: editForm.prep_time,
          cook_time: editForm.cook_time,
          servings: editForm.servings,
        })
        .eq("id", editingRecipe.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Recipe updated successfully",
      });

      setEditingRecipe(null);
      fetchRecipes();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update recipe",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    try {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Recipe deleted successfully",
      });

      fetchRecipes();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete recipe",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    navigate("/");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  const filterRecipesByStatus = (status: string) => {
    return recipes.filter(recipe => recipe.status === status);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Recipes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recipes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filterRecipesByStatus("pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filterRecipesByStatus("approved").length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Recipes</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <RecipeTable recipes={recipes} onApprove={updateRecipeStatus} onReject={updateRecipeStatus} onEdit={handleEditRecipe} onDelete={handleDeleteRecipe} />
        </TabsContent>
        <TabsContent value="pending">
          <RecipeTable recipes={filterRecipesByStatus("pending")} onApprove={updateRecipeStatus} onReject={updateRecipeStatus} onEdit={handleEditRecipe} onDelete={handleDeleteRecipe} />
        </TabsContent>
        <TabsContent value="approved">
          <RecipeTable recipes={filterRecipesByStatus("approved")} onApprove={updateRecipeStatus} onReject={updateRecipeStatus} onEdit={handleEditRecipe} onDelete={handleDeleteRecipe} />
        </TabsContent>
        <TabsContent value="rejected">
          <RecipeTable recipes={filterRecipesByStatus("rejected")} onApprove={updateRecipeStatus} onReject={updateRecipeStatus} onEdit={handleEditRecipe} onDelete={handleDeleteRecipe} />
        </TabsContent>
      </Tabs>

      <Dialog open={!!editingRecipe} onOpenChange={() => setEditingRecipe(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Recipe</DialogTitle>
            <DialogDescription>Make changes to the recipe details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="ingredients">Ingredients (comma separated)</Label>
              <Textarea
                id="ingredients"
                value={editForm.ingredients}
                onChange={(e) => setEditForm({ ...editForm, ingredients: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="instructions">Instructions (period separated)</Label>
              <Textarea
                id="instructions"
                value={editForm.instructions}
                onChange={(e) => setEditForm({ ...editForm, instructions: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="prep_time">Prep Time (min)</Label>
                <Input
                  id="prep_time"
                  type="number"
                  value={editForm.prep_time}
                  onChange={(e) => setEditForm({ ...editForm, prep_time: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="cook_time">Cook Time (min)</Label>
                <Input
                  id="cook_time"
                  type="number"
                  value={editForm.cook_time}
                  onChange={(e) => setEditForm({ ...editForm, cook_time: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="servings">Servings</Label>
                <Input
                  id="servings"
                  type="number"
                  value={editForm.servings}
                  onChange={(e) => setEditForm({ ...editForm, servings: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingRecipe(null)}>
                Cancel
              </Button>
              <Button onClick={saveEditedRecipe}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface RecipeTableProps {
  recipes: Recipe[];
  onApprove: (id: string, status: "approved") => void;
  onReject: (id: string, status: "rejected") => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

const RecipeTable = ({ recipes, onApprove, onReject, onEdit, onDelete }: RecipeTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recipe Management</CardTitle>
        <CardDescription>Review and manage submitted recipes</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell className="font-medium">{recipe.title}</TableCell>
                <TableCell>{recipe.submitted_by || "Anonymous"}</TableCell>
                <TableCell>{getStatusBadge(recipe.status)}</TableCell>
                <TableCell>{new Date(recipe.submitted_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {recipe.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => onApprove(recipe.id, "approved")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onReject(recipe.id, "rejected")}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(recipe)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this recipe? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(recipe.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;