public class BankFunction {
    // turn a bankaccount into a function that can be called to print the balance

    public static void main(String[] args) {

        // global variable to hold the balance
        double balance = 100.0;


    }

    public static void printBalance(double balance) {
        System.out.println(balance);
    }

    public static void deposit(double balance, double amount) {
        balance += amount;
    }
    public static void withdraw(double balance, double amount) {
        balance -= amount;
    }


}
