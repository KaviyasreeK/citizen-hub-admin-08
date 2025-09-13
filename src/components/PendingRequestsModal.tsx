import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PendingRequest {
  id: string;
  memberNo: string;
  memberName: string;
  requestedBy: string;
  requestDate: string;
  reason: string;
  changes: { field: string; oldValue: string; newValue: string }[];
  status: "pending" | "approved" | "rejected";
}

interface PendingRequestsModalProps {
  onClose: () => void;
}

// Mock pending requests data
const mockPendingRequests: PendingRequest[] = [
  {
    id: "UPD-123456",
    memberNo: "001",
    memberName: "Rajesh Kumar",
    requestedBy: "Administrator",
    requestDate: "2024-01-15",
    reason: "Member requested to update contact details due to change in phone number",
    changes: [
      { field: "contactDetails", oldValue: "9876543210", newValue: "9876543999" },
      { field: "address", oldValue: "123 Main Street, Delhi", newValue: "456 New Address, Delhi" }
    ],
    status: "pending"
  },
  {
    id: "UPD-789012",
    memberNo: "002",
    memberName: "Priya Sharma",
    requestedBy: "Administrator",
    requestDate: "2024-01-14",
    reason: "Correction needed in payment amount after bank verification",
    changes: [
      { field: "paidAmount", oldValue: "60000", newValue: "65000" }
    ],
    status: "pending"
  }
];

const PendingRequestsModal = ({ onClose }: PendingRequestsModalProps) => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<PendingRequest[]>(mockPendingRequests);
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(null);

  const handleApproveRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: "approved" as const } : req
    ));
    
    toast({
      title: "Request Approved",
      description: `Update request ${requestId} has been approved and member data has been updated.`,
    });
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: "rejected" as const } : req
    ));
    
    toast({
      title: "Request Rejected",
      description: `Update request ${requestId} has been rejected.`,
      variant: "destructive",
    });
  };

  const pendingRequests = requests.filter(req => req.status === "pending");
  const processedRequests = requests.filter(req => req.status !== "pending");

  if (selectedRequest) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border-gov-border">
          <CardHeader className="bg-gov-header text-white">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Request Details - {selectedRequest.id}
              </CardTitle>
              <Button
                onClick={() => setSelectedRequest(null)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong className="text-gov-header">Member:</strong>
                <p>{selectedRequest.memberName} (#{selectedRequest.memberNo})</p>
              </div>
              <div>
                <strong className="text-gov-header">Requested By:</strong>
                <p>{selectedRequest.requestedBy}</p>
              </div>
              <div>
                <strong className="text-gov-header">Request Date:</strong>
                <p>{selectedRequest.requestDate}</p>
              </div>
              <div>
                <strong className="text-gov-header">Status:</strong>
                <Badge variant={selectedRequest.status === "pending" ? "secondary" : 
                              selectedRequest.status === "approved" ? "default" : "destructive"}>
                  {selectedRequest.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div>
              <strong className="text-gov-header">Reason:</strong>
              <p className="mt-2 p-3 bg-gov-bg-light rounded border">{selectedRequest.reason}</p>
            </div>

            <div>
              <strong className="text-gov-header">Requested Changes:</strong>
              <div className="mt-2 space-y-2">
                {selectedRequest.changes.map((change, index) => (
                  <div key={index} className="p-3 bg-yellow-50 rounded border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-yellow-800">{change.field}:</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-white">
                          {change.oldValue}
                        </Badge>
                        <span>→</span>
                        <Badge variant="default" className="bg-yellow-600">
                          {change.newValue}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedRequest.status === "pending" && (
              <div className="flex justify-end gap-3 pt-4 border-t border-gov-border">
                <Button
                  onClick={() => handleRejectRequest(selectedRequest.id)}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Request
                </Button>
                <Button
                  onClick={() => handleApproveRequest(selectedRequest.id)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Request
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto border-gov-border">
        <CardHeader className="bg-gov-header text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Update Requests Management
            </CardTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Pending Requests */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gov-header mb-4">
              Pending Requests ({pendingRequests.length})
            </h3>
            {pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <Card key={request.id} className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="bg-yellow-600 text-white">
                              {request.id}
                            </Badge>
                            <span className="font-medium">
                              {request.memberName} (#{request.memberNo})
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Requested by {request.requestedBy} on {request.requestDate}
                          </p>
                          <p className="text-sm">{request.reason}</p>
                          <div className="mt-2 text-xs text-muted-foreground">
                            {request.changes.length} field(s) to be updated
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApproveRequest(request.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectRequest(request.id)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No pending requests at this time.
              </div>
            )}
          </div>

          {/* Processed Requests */}
          {processedRequests.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gov-header mb-4">
                Recently Processed ({processedRequests.length})
              </h3>
              <div className="space-y-2">
                {processedRequests.map((request) => (
                  <Card key={request.id} className="border-gray-200">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{request.id}</Badge>
                          <span className="text-sm">
                            {request.memberName} (#{request.memberNo})
                          </span>
                          <Badge variant={request.status === "approved" ? "default" : "destructive"}>
                            {request.status.toUpperCase()}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedRequest(request)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingRequestsModal;