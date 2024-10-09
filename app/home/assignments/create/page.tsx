import { createAssignment } from "@/lib/actions/assignmentRequest";

export default function Page() {
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Create Assignment</h1>
      <AssignmentForm />
    </main>
  );
}

function AssignmentForm() {
  return (
    <form action={createAssignment} className="space-y-4">
      <div>
        <label htmlFor="subject" className="block mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="name" className="block mb-2">
          Assignment Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="due_date" className="block mb-2">
          Due Date
        </label>
        <input
          type="datetime-local"
          id="due_date"
          name="due_date"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="marks" className="block mb-2">
          Marks
        </label>
        <input
          type="number"
          id="marks"
          name="marks"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="assignment_info" className="block mb-2">
          Assignment Info
        </label>
        <textarea
          id="assignment_info"
          name="assignment_info"
          className="w-full p-2 border rounded"
          rows={4}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Assignment
      </button>
    </form>
  );
}
