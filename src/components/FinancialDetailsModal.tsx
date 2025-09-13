import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

interface FinancialDetailsModalProps {
  member: Member;
  onClose: () => void;
}

const FinancialDetailsModal = ({ member, onClose }: FinancialDetailsModalProps) => {
  const formatAmount = (amount?: string) => {
    if (!amount) return "₹0";
    return `₹${parseFloat(amount).toLocaleString()}`;
  };

  const getPaymentStatusBadge = () => {
    const total = parseFloat(member.totalAmount || "0");
    const paid = parseFloat(member.paidAmount || "0");
    const remaining = parseFloat(member.remainingAmount || "0");

    if (remaining === 0 && paid > 0) {
      return <Badge className="bg-green-500 hover:bg-green-600">Fully Paid</Badge>;
    } else if (paid > 0 && remaining > 0) {
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Partially Paid</Badge>;
    } else if (paid === 0) {
      return <Badge variant="destructive">Unpaid</Badge>;
    }
    return <Badge variant="secondary">Unknown</Badge>;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-gov-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl text-gov-header flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial Details
            </CardTitle>
            <CardDescription>
              Complete financial information for the member
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
          {/* Member Basic Info */}
          <div className="bg-gov-bg-light p-4 rounded-lg border border-gov-border">
            <h3 className="font-semibold text-gov-header mb-3">Member Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Member Name</p>
                <p className="font-medium text-gov-text">{member.memberName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Number</p>
                <p className="font-medium text-gov-primary">{member.memberNo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Site Number</p>
                <p className="font-medium text-gov-text">{member.siteNo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <div className="mt-1">
                  {getPaymentStatusBadge()}
                </div>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">Total Amount</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {formatAmount(member.totalAmount)}
                  </p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">Paid Amount</p>
                  <p className="text-2xl font-bold text-green-900">
                    {formatAmount(member.paidAmount)}
                  </p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-800">Remaining Amount</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {formatAmount(member.remainingAmount)}
                  </p>
                </div>
                <div className="bg-orange-100 p-2 rounded-full">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-gov-bg-light p-4 rounded-lg border border-gov-border">
            <h3 className="font-semibold text-gov-header mb-3">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Mode of Payment</p>
                <p className="font-medium text-gov-text">
                  {member.modeOfPayment || "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Admission Fee Paid</p>
                <p className="font-medium text-gov-text">
                  {formatAmount(member.admissionFeePaid)}
                </p>
              </div>
            </div>
          </div>

          {/* Share Information */}
          {(member.shareNo || member.noOfShare || member.shareCapitalAmount) && (
            <div className="bg-gov-bg-light p-4 rounded-lg border border-gov-border">
              <h3 className="font-semibold text-gov-header mb-3">Share Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Share Number</p>
                  <p className="font-medium text-gov-text">
                    {member.shareNo || "Not assigned"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Number of Shares</p>
                  <p className="font-medium text-gov-text">
                    {member.noOfShare || "0"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Share Capital Amount</p>
                  <p className="font-medium text-gov-text">
                    {formatAmount(member.shareCapitalAmount)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 border-t border-gov-border">
            <Button
              onClick={onClose}
              className="w-full bg-gov-primary hover:bg-gov-primary-light text-white"
            >
              Close Financial Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialDetailsModal;