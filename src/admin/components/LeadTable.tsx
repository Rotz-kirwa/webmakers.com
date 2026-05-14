import { Mail, Phone } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Lead } from "@/admin/data";
import { StatusBadge } from "./AdminPrimitives";

export function LeadTable({
  leads,
  onUpdateLead,
}: {
  leads: Lead[];
  onUpdateLead?: (
    id: string,
    payload: Partial<Pick<Lead, "status" | "followUp" | "notes">>,
  ) => void;
}) {
  const [selectedMessage, setSelectedMessage] = useState<{
    message: string;
    notes: string[];
    name: string;
  } | null>(null);

  return (
    <>
      <div className="overflow-hidden border border-slate-200">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="min-w-48 px-4">Client</TableHead>
              <TableHead className="min-w-44">Service</TableHead>
              <TableHead className="min-w-40">Package</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Follow-up</TableHead>
              <TableHead className="min-w-60">Latest message</TableHead>
              <TableHead className="min-w-44">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id} className="bg-white align-top">
                <TableCell className="px-4 py-4">
                  <div className="font-black text-slate-950">{lead.name}</div>
                  <div className="mt-1 text-xs font-semibold text-slate-500">{lead.business}</div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {lead.phone}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {lead.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-sm font-semibold text-slate-700">
                  {lead.serviceType}
                  <p className="mt-1 text-xs font-normal text-slate-500">{lead.source}</p>
                </TableCell>
                <TableCell className="py-4 text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">{lead.packageInterest}</span>
                  <p className="mt-1 text-xs text-slate-500">{lead.budget}</p>
                </TableCell>
                <TableCell className="py-4">
                  <StatusBadge value={lead.status} />
                </TableCell>
                <TableCell className="py-4 text-sm font-semibold text-slate-700">
                  {lead.followUp}
                  <p className="mt-1 text-xs font-normal text-slate-500">{lead.createdAt}</p>
                </TableCell>
                <TableCell className="py-4 text-sm leading-relaxed text-slate-600">
                  <button
                    onClick={() =>
                      setSelectedMessage({
                        message: lead.lastMessage,
                        notes: lead.notes,
                        name: lead.name,
                      })
                    }
                    className="text-left hover:text-slate-800 underline decoration-dotted"
                  >
                    {lead.lastMessage.length > 100
                      ? `${lead.lastMessage.substring(0, 100)}...`
                      : lead.lastMessage}
                  </button>
                  {lead.notes.length > 0 && (
                    <p className="mt-2 text-xs font-semibold text-slate-500">
                      {lead.notes[0].length > 50
                        ? `${lead.notes[0].substring(0, 50)}...`
                        : lead.notes[0]}
                    </p>
                  )}
                </TableCell>
                <TableCell className="py-4">
                  <div className="grid gap-2">
                    <select
                      value={lead.status}
                      onChange={(event) =>
                        onUpdateLead?.(lead.id, { status: event.target.value as Lead["status"] })
                      }
                      className="h-9 rounded-md border border-slate-200 bg-white px-2 text-xs font-bold text-slate-700"
                    >
                      {["New", "Contacted", "Hot", "Closed", "Rejected"].map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                    <select
                      value={lead.followUp}
                      onChange={(event) =>
                        onUpdateLead?.(lead.id, { followUp: event.target.value as Lead["followUp"] })
                      }
                      className="h-9 rounded-md border border-slate-200 bg-white px-2 text-xs font-bold text-slate-700"
                    >
                      {["Today", "Tomorrow", "This week", "Waiting", "Done"].map((followUp) => (
                        <option key={followUp}>{followUp}</option>
                      ))}
                    </select>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const note = window.prompt("Add a lead note");
                        if (note?.trim()) {
                          onUpdateLead?.(lead.id, { notes: [note.trim(), ...lead.notes] });
                        }
                      }}
                      className="rounded-md"
                    >
                      Add note
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
            <DialogDescription>Full message and notes</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-slate-700 mb-2">Latest Message:</h4>
              <p className="text-sm text-slate-600 whitespace-pre-wrap">{selectedMessage?.message}</p>
            </div>
            {selectedMessage?.notes && selectedMessage.notes.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-slate-700 mb-2">Notes:</h4>
                <div className="space-y-2">
                  {selectedMessage.notes.map((note, index) => (
                    <div key={index} className="text-sm text-slate-600 p-2 bg-slate-50 rounded">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
