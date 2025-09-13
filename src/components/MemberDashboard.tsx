import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, LogOut, Eye, Edit, Filter, UserPlus, DollarSign, Edit2, Bell } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MemberDetails from "./MemberDetails";
import AddMemberModal from "./AddMemberModal";
import FinancialDetailsModal from "./FinancialDetailsModal";
import UpdateRequestModal from "./UpdateRequestModal";
import PendingRequestsModal from "./PendingRequestsModal";

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

interface MemberDashboardProps {
  userRole: string;
  onLogout: () => void;
}

// Mock member data
const mockMembers: Member[] = [
  {
    memberNo: "001",
    memberName: "Rajesh Kumar",
    memberType: "Regular",
    siteNo: "1",
    contactDetails: "9876543210",
    memberClass: "A",
    admissionDate: "2020-01-15",
    address: "123 Main Street, Delhi",
    shareNo: "SH001",
    noOfShare: "5",
    shareCapitalAmount: "50000",
    gender: "Male",
    caste: "General",
    aadhaar: "1234-5678-9012",
    familyCard: "FC001",
    voterID: "VID001",
    pan: "ABCDE1234F",
    admissionFeePaid: "5000",
    nomineeName: "Priya Kumar",
    relationship: "Wife",
    totalAmount: "100000",
    paidAmount: "75000",
    remainingAmount: "25000",
    modeOfPayment: "Bank Transfer"
  },
  {
    memberNo: "002",
    memberName: "Priya Sharma",
    memberType: "Associate",
    siteNo: "2",
    contactDetails: "9876543211",
    memberClass: "B",
    admissionDate: "2020-03-20",
    address: "456 Park Avenue, Mumbai",
    shareNo: "SH002",
    noOfShare: "3",
    shareCapitalAmount: "30000",
    gender: "Female",
    caste: "OBC",
    aadhaar: "2234-5678-9012",
    familyCard: "FC002",
    voterID: "VID002",
    pan: "BCDEF2345G",
    admissionFeePaid: "3000",
    nomineeName: "Amit Sharma",
    relationship: "Husband",
    totalAmount: "60000",
    paidAmount: "60000",
    remainingAmount: "0",
    modeOfPayment: "Cheque"
  },
  {
    memberNo: "003",
    memberName: "Amit Patel",
    memberType: "Regular",
    siteNo: "1",
    contactDetails: "9876543212",
    memberClass: "A",
    admissionDate: "2021-06-10",
    address: "789 Garden Road, Pune",
    shareNo: "SH003",
    noOfShare: "7",
    shareCapitalAmount: "70000",
    gender: "Male",
    caste: "General",
    aadhaar: "3234-5678-9012",
    familyCard: "FC003",
    voterID: "VID003",
    pan: "CDEFG3456H",
    admissionFeePaid: "7000",
    nomineeName: "Sunita Patel",
    relationship: "Wife",
    totalAmount: "150000",
    paidAmount: "50000",
    remainingAmount: "100000",
    modeOfPayment: "Cash"
  },
  {
    memberNo: "010",
    memberName: "Sunita Singh",
    memberType: "Premium",
    siteNo: "4",
    contactDetails: "9876543220",
    memberClass: "A+",
    admissionDate: "2019-12-05",
    address: "321 Elite Colony, Bangalore",
    shareNo: "SH010",
    noOfShare: "10",
    shareCapitalAmount: "100000",
    gender: "Female",
    caste: "SC",
    aadhaar: "4234-5678-9012",
    familyCard: "FC010",
    voterID: "VID010",
    pan: "DEFGH4567I",
    admissionFeePaid: "10000",
    nomineeName: "Raj Singh",
    relationship: "Son",
    totalAmount: "200000",
    paidAmount: "150000",
    remainingAmount: "50000",
    modeOfPayment: "Online"
  }
];

const MemberDashboard = ({ userRole, onLogout }: MemberDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("memberNo");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(mockMembers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFinancialModal, setShowFinancialModal] = useState<Member | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState<Member | null>(null);
  const [showPendingRequestsModal, setShowPendingRequestsModal] = useState(false);
  const [members, setMembers] = useState<Member[]>(mockMembers);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredMembers(members);
      return;
    }

    const filtered = members.filter((member) => {
      if (searchBy === "memberNo") {
        return member.memberNo.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchBy === "siteNo") {
        return member.siteNo.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
    
    setFilteredMembers(filtered);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredMembers(members);
  };

  const handleAddMember = (newMember: Member) => {
    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);
    setFilteredMembers(updatedMembers);
  };

  if (selectedMember) {
    return (
      <MemberDetails 
        member={selectedMember} 
        userRole={userRole}
        onBack={() => setSelectedMember(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gov-bg-light">
      {/* Header */}
      <header className="bg-gov-header text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Member Management System</h1>
              <p className="text-blue-200 text-sm">
                Logged in as: {userRole.toUpperCase()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {userRole === "head1" && (
                <Button
                  onClick={() => setShowPendingRequestsModal(true)}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gov-header"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Pending Requests (2)
                </Button>
              )}
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gov-header"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="flex justify-between items-center mb-8">
          <Card className="flex-1 mr-4 border-gov-border">
            <CardHeader>
              <CardTitle className="text-gov-header flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2 text-gov-text">
                    Search By
                  </label>
                  <Select value={searchBy} onValueChange={setSearchBy}>
                    <SelectTrigger className="border-gov-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="memberNo">Member Number</SelectItem>
                      <SelectItem value="siteNo">Site Number</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-2">
                  <label className="block text-sm font-medium mb-2 text-gov-text">
                    Search Term
                  </label>
                  <Input
                    placeholder={`Enter ${searchBy === 'memberNo' ? 'member number' : 'site number'}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-gov-border"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="bg-gov-primary hover:bg-gov-primary-light"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button 
                  onClick={clearSearch}
                  variant="outline"
                  className="border-gov-border"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-gov-secondary hover:bg-orange-600 text-white"
            size="lg"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add New Member
          </Button>
        </div>

        {/* Members Table */}
        <Card className="border-gov-border">
          <CardHeader>
            <CardTitle className="text-gov-header">
              Member Dataset ({filteredMembers.length} records)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gov-border">
                    <th className="text-left py-3 px-4 font-semibold text-gov-header">Member No</th>
                    <th className="text-left py-3 px-4 font-semibold text-gov-header">Member Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gov-header">Member Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gov-header">Site No</th>
                    <th className="text-left py-3 px-4 font-semibold text-gov-header">Contact Details</th>
                    <th className="text-left py-3 px-4 font-semibold text-gov-header">Total Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gov-header">Paid Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gov-header">Remaining</th>
                    <th className="text-left py-3 px-4 font-semibold text-gov-header">Payment Mode</th>
                    <th className="text-left py-3 px-4 font-semibold text-gov-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member, index) => (
                    <tr 
                      key={member.memberNo} 
                      className={`border-b border-gov-border hover:bg-muted/50 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gov-bg-light'
                      }`}
                    >
                      <td className="py-3 px-4 font-medium text-gov-primary">
                        {member.memberNo}
                      </td>
                      <td className="py-3 px-4 text-gov-text">{member.memberName}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={member.memberType === 'Premium' ? 'default' : 'secondary'}
                          className={member.memberType === 'Premium' ? 'bg-gov-secondary' : ''}
                        >
                          {member.memberType}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gov-text">{member.siteNo}</td>
                      <td className="py-3 px-4 text-gov-text">{member.contactDetails}</td>
                      <td className="py-3 px-4 text-gov-text">₹{parseFloat(member.totalAmount || '0').toLocaleString()}</td>
                      <td className="py-3 px-4 text-green-600 font-medium">₹{parseFloat(member.paidAmount || '0').toLocaleString()}</td>
                      <td className="py-3 px-4 text-orange-600 font-medium">₹{parseFloat(member.remainingAmount || '0').toLocaleString()}</td>
                      <td className="py-3 px-4 text-gov-text">{member.modeOfPayment || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => setSelectedMember(member)}
                            className="bg-gov-primary hover:bg-gov-primary-light text-white"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Extra Info
                          </Button>
                          {userRole === "admin1" && (
                            <Button
                              size="sm"
                              onClick={() => setShowUpdateModal(member)}
                              className="bg-amber-600 hover:bg-amber-700 text-white"
                            >
                              <Edit2 className="w-4 h-4 mr-1" />
                              Update
                            </Button>
                          )}
                          {userRole === "head1" && (
                            <Badge variant="outline" className="px-2 py-1 text-xs">
                              Updates via Approval Only
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            onClick={() => setShowFinancialModal(member)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <DollarSign className="w-4 h-4 mr-1" />
                            Financial
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredMembers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No members found matching your search criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        {showAddModal && (
          <AddMemberModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddMember}
          />
        )}

        {showFinancialModal && (
          <FinancialDetailsModal
            member={showFinancialModal}
            onClose={() => setShowFinancialModal(null)}
          />
        )}

        {showUpdateModal && userRole === "admin1" && (
          <UpdateRequestModal
            member={showUpdateModal}
            onClose={() => setShowUpdateModal(null)}
          />
        )}

        {showPendingRequestsModal && userRole === "head1" && (
          <PendingRequestsModal
            onClose={() => setShowPendingRequestsModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;