import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, UserPlus } from "lucide-react";
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

interface AddMemberModalProps {
  onClose: () => void;
  onAdd: (member: Member) => void;
}

const AddMemberModal = ({ onClose, onAdd }: AddMemberModalProps) => {
  const [formData, setFormData] = useState<Member>({
    memberNo: "",
    memberName: "",
    memberType: "",
    siteNo: "",
    contactDetails: "",
    memberClass: "",
    admissionDate: "",
    address: "",
    shareNo: "",
    noOfShare: "",
    shareCapitalAmount: "",
    gender: "",
    caste: "",
    aadhaar: "",
    familyCard: "",
    voterID: "",
    pan: "",
    admissionFeePaid: "",
    nomineeName: "",
    relationship: "",
    totalAmount: "",
    paidAmount: "",
    remainingAmount: "",
    modeOfPayment: ""
  });

  const { toast } = useToast();

  const handleInputChange = (field: keyof Member, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.memberNo || !formData.memberName || !formData.memberType || !formData.siteNo || !formData.contactDetails) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields (Member No, Name, Type, Site No, Contact Details).",
        variant: "destructive",
      });
      return;
    }

    onAdd(formData);
    toast({
      title: "Member Added Successfully",
      description: `Member ${formData.memberName} has been added to the system.`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-gov-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl text-gov-header">Add New Member</CardTitle>
            <CardDescription>
              Enter member information to add a new member to the system.
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-destructive hover:text-destructive-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="memberNo">Member Number *</Label>
              <Input
                id="memberNo"
                value={formData.memberNo}
                onChange={(e) => handleInputChange("memberNo", e.target.value)}
                placeholder="Enter member number"
                className="border-gov-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memberName">Member Name *</Label>
              <Input
                id="memberName"
                value={formData.memberName}
                onChange={(e) => handleInputChange("memberName", e.target.value)}
                placeholder="Enter member name"
                className="border-gov-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memberType">Member Type *</Label>
              <Select value={formData.memberType} onValueChange={(value) => handleInputChange("memberType", value)}>
                <SelectTrigger className="border-gov-border">
                  <SelectValue placeholder="Select member type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Regular">Regular</SelectItem>
                  <SelectItem value="Associate">Associate</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteNo">Site Number *</Label>
              <Input
                id="siteNo"
                value={formData.siteNo}
                onChange={(e) => handleInputChange("siteNo", e.target.value)}
                placeholder="Enter site number"
                className="border-gov-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactDetails">Contact Details *</Label>
              <Input
                id="contactDetails"
                value={formData.contactDetails}
                onChange={(e) => handleInputChange("contactDetails", e.target.value)}
                placeholder="Enter contact number"
                className="border-gov-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memberClass">Member Class</Label>
              <Select value={formData.memberClass} onValueChange={(value) => handleInputChange("memberClass", value)}>
                <SelectTrigger className="border-gov-border">
                  <SelectValue placeholder="Select member class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="A+">A+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="admissionDate">Admission Date</Label>
              <Input
                id="admissionDate"
                type="date"
                value={formData.admissionDate}
                onChange={(e) => handleInputChange("admissionDate", e.target.value)}
                className="border-gov-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger className="border-gov-border">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="caste">Caste</Label>
              <Select value={formData.caste} onValueChange={(value) => handleInputChange("caste", value)}>
                <SelectTrigger className="border-gov-border">
                  <SelectValue placeholder="Select caste" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="OBC">OBC</SelectItem>
                  <SelectItem value="SC">SC</SelectItem>
                  <SelectItem value="ST">ST</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter address"
                className="border-gov-border"
              />
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-gov-bg-light p-4 rounded-lg border border-gov-border">
            <h3 className="font-semibold text-gov-header mb-4">Financial Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalAmount">Total Amount</Label>
                <Input
                  id="totalAmount"
                  value={formData.totalAmount}
                  onChange={(e) => handleInputChange("totalAmount", e.target.value)}
                  placeholder="Enter total amount"
                  className="border-gov-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paidAmount">Paid Amount</Label>
                <Input
                  id="paidAmount"
                  value={formData.paidAmount}
                  onChange={(e) => handleInputChange("paidAmount", e.target.value)}
                  placeholder="Enter paid amount"
                  className="border-gov-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="remainingAmount">Remaining Amount</Label>
                <Input
                  id="remainingAmount"
                  value={formData.remainingAmount}
                  onChange={(e) => handleInputChange("remainingAmount", e.target.value)}
                  placeholder="Enter remaining amount"
                  className="border-gov-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modeOfPayment">Mode of Payment</Label>
                <Select value={formData.modeOfPayment} onValueChange={(value) => handleInputChange("modeOfPayment", value)}>
                  <SelectTrigger className="border-gov-border">
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Number</Label>
              <Input
                id="aadhaar"
                value={formData.aadhaar}
                onChange={(e) => handleInputChange("aadhaar", e.target.value)}
                placeholder="Enter Aadhaar number"
                className="border-gov-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pan">PAN Number</Label>
              <Input
                id="pan"
                value={formData.pan}
                onChange={(e) => handleInputChange("pan", e.target.value)}
                placeholder="Enter PAN number"
                className="border-gov-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomineeName">Nominee Name</Label>
              <Input
                id="nomineeName"
                value={formData.nomineeName}
                onChange={(e) => handleInputChange("nomineeName", e.target.value)}
                placeholder="Enter nominee name"
                className="border-gov-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship</Label>
              <Input
                id="relationship"
                value={formData.relationship}
                onChange={(e) => handleInputChange("relationship", e.target.value)}
                placeholder="Enter relationship"
                className="border-gov-border"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gov-border">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gov-border"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gov-primary hover:bg-gov-primary-light text-white"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMemberModal;