import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Send, Edit2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Member {
  memberNo: string;
  memberName: string;
  memberType: string;
  siteNo: string;
  contactDetails: string;
  memberClass?: string;
  admissionDate?: string;
  address?: string;
  shareNo?: string;
  noOfShare?: string;
  shareCapitalAmount?: string;
  gender?: string;
  caste?: string;
  aadhaar?: string;
  familyCard?: string;
  voterID?: string;
  pan?: string;
  admissionFeePaid?: string;
  nomineeName?: string;
  relationship?: string;
  totalAmount?: string;
  paidAmount?: string;
  remainingAmount?: string;
  modeOfPayment?: string;
}

interface UpdateRequestModalProps {
  member: Member;
  onClose: () => void;
}

const UpdateRequestModal = ({ member, onClose }: UpdateRequestModalProps) => {
  const { toast } = useToast();
  const [updatedFields, setUpdatedFields] = useState<Partial<Member>>({});
  const [requestReason, setRequestReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: keyof Member, value: string) => {
    setUpdatedFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitRequest = async () => {
    if (Object.keys(updatedFields).length === 0) {
      toast({
        title: "No Changes Detected",
        description: "Please make at least one change before submitting the request.",
        variant: "destructive",
      });
      return;
    }

    if (!requestReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for this update request.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate request ID
    const requestId = `UPD-${Date.now().toString().slice(-6)}`;

    toast({
      title: "Update Request Submitted",
      description: `Request ID: ${requestId} has been sent to Head1 for approval. You will be notified once processed.`,
    });

    setIsSubmitting(false);
    onClose();
  };

  const getChangedFields = () => {
    return Object.entries(updatedFields).filter(([key, value]) => 
      value !== member[key as keyof Member]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-gov-border">
        <CardHeader className="bg-gov-header text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Edit2 className="h-5 w-5" />
              Update Request - Member #{member.memberNo}
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
          <p className="text-blue-200 text-sm">
            Submit update request to Head1 for approval
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Current Member Info */}
          <div className="bg-gov-bg-light p-4 rounded-lg border border-gov-border">
            <h3 className="font-semibold text-gov-header mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Current Member Information
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><strong>Name:</strong> {member.memberName}</div>
              <div><strong>Type:</strong> {member.memberType}</div>
              <div><strong>Site No:</strong> {member.siteNo}</div>
              <div><strong>Contact:</strong> {member.contactDetails}</div>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gov-text">Member Name</Label>
              <Input
                value={updatedFields.memberName ?? member.memberName}
                onChange={(e) => handleFieldChange('memberName', e.target.value)}
                className="border-gov-border"
              />
            </div>
            
            <div>
              <Label className="text-gov-text">Member Type</Label>
              <Input
                value={updatedFields.memberType ?? member.memberType}
                onChange={(e) => handleFieldChange('memberType', e.target.value)}
                className="border-gov-border"
              />
            </div>
            
            <div>
              <Label className="text-gov-text">Contact Details</Label>
              <Input
                value={updatedFields.contactDetails ?? member.contactDetails}
                onChange={(e) => handleFieldChange('contactDetails', e.target.value)}
                className="border-gov-border"
              />
            </div>
            
            <div>
              <Label className="text-gov-text">Address</Label>
              <Input
                value={updatedFields.address ?? member.address ?? ''}
                onChange={(e) => handleFieldChange('address', e.target.value)}
                className="border-gov-border"
              />
            </div>
            
            <div>
              <Label className="text-gov-text">Total Amount (₹)</Label>
              <Input
                type="number"
                value={updatedFields.totalAmount ?? member.totalAmount ?? ''}
                onChange={(e) => handleFieldChange('totalAmount', e.target.value)}
                className="border-gov-border"
              />
            </div>
            
            <div>
              <Label className="text-gov-text">Paid Amount (₹)</Label>
              <Input
                type="number"
                value={updatedFields.paidAmount ?? member.paidAmount ?? ''}
                onChange={(e) => handleFieldChange('paidAmount', e.target.value)}
                className="border-gov-border"
              />
            </div>
          </div>

          {/* Request Reason */}
          <div>
            <Label className="text-gov-text">Reason for Update Request *</Label>
            <Textarea
              placeholder="Please provide a detailed reason for this update request..."
              value={requestReason}
              onChange={(e) => setRequestReason(e.target.value)}
              className="border-gov-border min-h-[100px]"
            />
          </div>

          {/* Changes Summary */}
          {getChangedFields().length > 0 && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">Changes to be Requested:</h3>
              <div className="space-y-2">
                {getChangedFields().map(([field, newValue]) => (
                  <div key={field} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-yellow-700">{field}:</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-white">
                        {member[field as keyof Member] || 'Empty'}
                      </Badge>
                      <span>→</span>
                      <Badge variant="default" className="bg-yellow-600">
                        {newValue as string}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gov-border">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gov-border"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitRequest}
              disabled={isSubmitting}
              className="bg-gov-primary hover:bg-gov-primary-light text-white"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request to Head1
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateRequestModal;